imports=("AlertService")
echo "TEST"
for import in ${imports[@]}; do
    formattedImport="import\s*{\s*$import\s*}\s*from\s*'@app\/services"
    grep -i -w -R $formattedImport ./projects ./src
done
exit 0
