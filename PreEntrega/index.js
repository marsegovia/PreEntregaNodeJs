const args = process.argv.slice(2);
const [command, segundo, title, priceArg, category] = args;

const parts = segundo.split("/");
const segundoParts = parts[0]; // "products"
const id = parts[1]; 

const price = parseFloat(priceArg);
const nuevoProducto = { title, price, category };

/*const nuevoProducto = { es lo mismo que esto
  title: title,
  price: price,
  category: category
}; 
*/

switch (command){
    case 'GET':
        if(segundo === "Products" && !id){
            fetch("https://fakestoreapi.com/products/")   // pedimos todos los productos
        .then(res => res.json())                 
        .then(data => {                         
        console.log("Productos:");
        console.log(data);                   
        })
        .catch(err => console.error("Error:", err));
    }
    else if(segundoParts === "Products" && id){
            fetch(`https://fakestoreapi.com/products/${id}`)   // pedimos un producto
            .then(res => res.json())                 
            .then(data => {                         
                console.log("Producto:");
                console.log(data);                   
            })
            .catch(err => console.error("Error:", err));
        }
    break;

    case 'POST':
        if (segundo === "Products") {
            fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto)
            })
            .then(res => res.json())
            .then(data => console.log("Producto creado:", data))
            .catch(err => console.error("Error:", err));
        }
        break;

    case 'DELETE':
        if(segundoParts === "Products" && id){
            fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "DELETE"
            })   // borramos un producto
            .then(res => res.json())                 
            .then(data => {                         
                console.log("Producto eliminado exitosamente");
                console.log(data);                   
            })
            .catch(err => console.error("Error:", err));
        }
        break;

    default:
        console.log('Comando no reconocido. Usa GET, DELETE o POST');
}
