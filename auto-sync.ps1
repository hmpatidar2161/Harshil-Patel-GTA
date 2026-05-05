Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   GTA Portfolio - Auto-Sync to GitHub Script" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Monitoring for changes in: $PWD"
Write-Host "Press Ctrl+C to stop this script." -ForegroundColor Yellow
Write-Host ""

while ($true) {
    # Check if there are any uncommitted changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "Changes detected! Committing and pushing to GitHub..." -ForegroundColor Yellow
        git add .
        git commit -m "Auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git push origin main
        Write-Host "Successfully synced with GitHub at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
        Write-Host ""
    }
    # Wait for 15 seconds before checking again
    Start-Sleep -Seconds 15
}
