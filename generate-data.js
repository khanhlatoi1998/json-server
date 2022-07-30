var casual = require('casual');
const fs = require("fs");

const casualPhoto = () => casual.integer(from = 1, to = 1000);
const casualCategoryId = () => casual.integer(from = 1, to = 4);
const casualTitle = () => casual.title;
const casualId = () => casual.uuid;
    

const randomListProducts = (n) => {
    if (n <= 0) {
        return [];
    }

    const productsList = [];

    Array.from(new Array(n)).forEach(() => {
        const products =  {
            id: casualId(),
            title: casualTitle(),
            casualCategoryId: casualCategoryId(),
            photo: `https://picsum.photos/id/${casualPhoto()}/200/300`
        };

        productsList.push(products);
    });

    return productsList;
};


(() => {
    const productsList = randomListProducts(11);

    const data = {
        products: productsList
    }

    fs.writeFile('db.json', JSON.stringify(data), () => {
        console.log("suscessfuly!");
    });
})()