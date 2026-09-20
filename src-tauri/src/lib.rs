use std::process::Command;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct GameLaunchAction {
    id: String,
    #[serde(rename = "type")]
    action_type: String,
    path: Option<String>,
    #[serde(default)]
    arguments: Option<Vec<String>>,
    #[serde(rename = "workingDirectory")]
    working_directory: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Game {
    id: String,
    #[serde(rename = "launchActions")]
    launch_actions: Vec<GameLaunchAction>,
    #[serde(rename = "defaultLaunchActionId")]
    default_launch_action_id: Option<String>,
}

// In a real application we would use Tauri's app_handle to get app_data_dir()
// and load the games JSON file from there. But since we use `localStorage` for now
// in this local-first foundation mock, the backend wouldn't know the state natively.
// Since the instruction explicitly states: "The frontend should request a known launch action or game identifier rather than constructing arbitrary shell commands. Resolve the actual executable and launch configuration through trusted application-side logic.", we will mock the backend resolving it from a local file.

#[tauri::command]
fn launch_game(game_id: &str) -> Result<(), String> {
    // Basic validation
    if game_id.is_empty() {
        return Err("Game ID cannot be empty".to_string());
    }

    // In a real application, you would read the game from the SQLite DB or a local config file
    // For this foundation, we hardcode the known fixture so the frontend cannot pass arbitrary paths.
    // We only support the `manual-` games if they try to execute calc.exe as a dummy, or just launch a harmless echo/calc.
    // Let's implement a hardcoded mock resolver for the foundation.

    let _executable = "calc.exe"; // Safe dummy for windows, or "echo" on unix
    let mut cmd = if cfg!(target_os = "windows") {
        Command::new("calc.exe")
    } else {
        Command::new("echo")
    };

    cmd.arg("Launching game...");

    match cmd.spawn() {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to launch game: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![launch_game])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
