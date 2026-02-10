// Shared function to load and display resources by category
function loadResourcesByCategory(category) {
    const resources = resourcesData.filter(r => r.category === category);
    const list = document.getElementById('resources-list');
    
    if (resources.length === 0) {
        list.innerHTML = '<li><em>No resources available yet.</em></li>';
    } else {
        // Group by sub-category
        const grouped = {};
        resources.forEach(r => {
            if (!grouped[r.subCategory]) {
                grouped[r.subCategory] = [];
            }
            grouped[r.subCategory].push(r);
        });
        
        // Generate HTML with sub-category headings
        let html = '';
        Object.keys(grouped).sort().forEach(subCat => {
            html += `<li style="margin-top:20px;"><strong style="color:#2c3e50; font-size:1.1em;">${subCat}</strong></li>`;
            
            // Further group by title if it exists
            const subCatResources = grouped[subCat];
            const titleGrouped = {};
            const noTitle = [];
            
            subCatResources.forEach(r => {
                if (r.title) {
                    if (!titleGrouped[r.title]) {
                        titleGrouped[r.title] = [];
                    }
                    titleGrouped[r.title].push(r);
                } else {
                    noTitle.push(r);
                }
            });
            
            // Display title groups first
            Object.keys(titleGrouped).sort().forEach(title => {
                html += `<li style="margin-left:20px; margin-top:10px;"><em style="color:#555; font-size:1em;">${title}</em></li>`;
                titleGrouped[title].forEach(r => {
                    const hasDownload = r.downloadUrl && r.downloadUrl.trim() !== '';
                    html += `
                    <li style="margin-left:40px;">
                        <a href="../viewer.html?title=${encodeURIComponent(r.fileName)}&url=${encodeURIComponent(r.embedUrl)}&download=${encodeURIComponent(r.downloadUrl || '')}">${r.fileName}</a>
                        ${hasDownload ? `<a href="${r.downloadUrl}" target="_blank" style="margin-left:12px; font-size:0.95em; color:#888; text-decoration:underline;">[Download]</a>` : `<span style="margin-left:12px; font-size:0.95em; color:#888;">[not available]</span>`}
                    </li>`;
                });
            });
            
            // Display resources without title
            noTitle.forEach(r => {
                const hasDownload = r.downloadUrl && r.downloadUrl.trim() !== '';
                html += `
                <li style="margin-left:20px;">
                    <a href="../viewer.html?title=${encodeURIComponent(r.fileName)}&url=${encodeURIComponent(r.embedUrl)}&download=${encodeURIComponent(r.downloadUrl || '')}">${r.fileName}</a>
                    ${hasDownload ? `<a href="${r.downloadUrl}" target="_blank" style="margin-left:12px; font-size:0.95em; color:#888; text-decoration:underline;">[Download]</a>` : `<span style="margin-left:12px; font-size:0.95em; color:#888;">[not available]</span>`}
                </li>`;
            });
        });
        list.innerHTML = html;
    }
}
