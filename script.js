function search() {
    const query = document.getElementById('searchInput').value;
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.title && data.extract) {
                const title = document.createElement('h2');
                title.textContent = data.title;
                resultsDiv.appendChild(title);

                const extract = document.createElement('p');
                extract.textContent = data.extract;
                resultsDiv.appendChild(extract);

                if (data.thumbnail && data.thumbnail.source) {
                    const img = document.createElement('img');
                    img.src = data.thumbnail.source;
                    resultsDiv.appendChild(img);
                }

                if (data.content_urls && data.content_urls.desktop.page) {
                    const link = document.createElement('a');
                    link.href = data.content_urls.desktop.page;
                    link.textContent = 'Read more on Wikipedia';
                    link.target = '_blank';
                    resultsDiv.appendChild(link);
                }
            } else {
                resultsDiv.textContent = 'No results found';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').textContent = 'An error occurred while fetching data';
        });
}