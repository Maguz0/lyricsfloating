# Verifica si Spicetify está instalado
if (-not (Get-Command spicetify -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Spicetify no está instalado. Por favor instálalo desde https://github.com/spicetify/spicetify-cli"
    exit
}

# Ruta al directorio de CustomApps
$customAppsPath = "$env:USERPROFILE\.spicetify\CustomApps"

# Ruta de instalación de tu app
$lyricsAppPath = Join-Path $customAppsPath "lyricsfloating"

# Clona el repositorio si no existe
if (-not (Test-Path $lyricsAppPath)) {
    Write-Host "📥 Clonando lyricsfloating desde GitHub..."
    git clone https://github.com/Maguz0/lyricsfloating $lyricsAppPath
} else {
    Write-Host "🔄 Actualizando lyricsfloating..."
    Set-Location $lyricsAppPath
    git pull
}

# Configura Spicetify para usar la app
spicetify config custom_apps lyricsfloating
spicetify apply

Write-Host "✅ Instalación completada. Abre Spotify y verifica la app en la interfaz."
