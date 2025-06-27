export const initialStore=()=>{
  return{
    message: null,
    products: [
      {
        id: 1,
        name: "Name",
        brand: "Brand",
        category: "Category",
        expiration_date: "Expiration Date",
        opened_date: "Opened Date"
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "set_product":
      const newStore = {...store};
      newStore.products = action.payload;
      return newStore;
    case "add_product":
      const newProduct = action.payload;
      return {
        ...store,
        products: [...store.products, newProduct]
      };
    case "delete_product":
      const newProducts = store.products.filter(product => product.id !== action.payload);
      return {
        ...store,
        products: newProducts
      };
    case "update_product":
      const updatedProducts = store.products.map(product => {
        if (product.id === action.payload.id) {
          return { ...product, ...action.payload };
        }
        return product;
      });
      return {
        ...store,
        products: updatedProducts
      };
    default:
      throw Error('Unknown action.');
  }    
}
