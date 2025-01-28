const axios = require('axios');

async function validateBookISBN(isbn) {
    try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

        if (Object.keys(response.data).length === 0) {
            return { valid: false, message: 'ISBN not found in Open Library database' };
        }

        const bookData = response.data[`ISBN:${isbn}`];
        return {
            valid: true,
            title: bookData.title,
            authors: bookData.authors.map(author => author.name),
            publish_date: bookData.publish_date,
            publishers: bookData.publishers.map(pub => pub.name),
        };
    } catch (error) {
        console.error('Error validating ISBN:', error.message);
        throw new Error('Failed to validate ISBN with Open Library API');
    }
}

module.exports = { validateBookISBN };
