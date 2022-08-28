imports=("AlertService" "SearchService" "AgentsubService" "ApiService" "MessageDetailsService" "ShowDetailsService" "TimeFormattingService" "TooltipService")
invalidImports=""
for import in ${imports[@]}; do
    formattedImport="import\s*{\s*$import\s*}\s*from\s*(?:'@app\/services|'.\/services)"
    invalidImports+=$(grep -P -i -w -R $formattedImport ./projects ./src)
done
if [[ $invalidImports ]]; then  
    echo -e "$invalidImports"
    echo "Imports listed above are using @app/services or ./services while they should be using @it-app/services"
    exit 1
else 
    echo "All imports from the list are valid"
    exit 0
fi
