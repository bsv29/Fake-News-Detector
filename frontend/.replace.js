const fs = require('fs');

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'http://127.0.0.1:8000...' with `\${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}...`
    content = content.replace(/['"]http:\/\/(?:127\.0\.0\.1|localhost):8000(.*?)['"]/g, '`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}$1`');
    
    // Replace `http://127.0.0.1:8000...` with `\${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}...`
    content = content.replace(/`http:\/\/(?:127\.0\.0\.1|localhost):8000(.*?)`/g, '`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}$1`');
    
    fs.writeFileSync(filePath, content);
}

const files = [
    'src/pages/results-page/ResultsPage.jsx',
    'src/pages/history-page/HistoryPage.jsx',
    'src/pages/auth/signup/Signup.jsx',
    'src/pages/auth/login/Login.jsx',
    'src/pages/analytics-page/AnalyticsPage.jsx',
    'src/context/AuthContext.jsx',
    'src/components/table/HistoryTable.jsx'
];

files.forEach(f => replaceInFile(f));
console.log('Replacements done!');
