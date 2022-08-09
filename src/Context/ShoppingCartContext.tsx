import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../Components/ShoppingCart";
import { useLocalStorage } from "../Hooks/useLocalStorage";

type shoppingCartProviderProps={
    children:ReactNode
}

type cartItem={
    id:number,
    quantity:number
}

type shoppingCartContext={
    openCart:()=>void;
    closeCart:()=>void;
    getItemQuantity:(id:number)=>number
    increaseCartQuantity:(id:number)=>void  //same as adding
    decreaseCartQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
    cartQuantity:number
    cartItems:cartItem[]
}

const shoppingCartContext=createContext({} as shoppingCartContext)

export function useShoppingCart()
{
    return useContext(shoppingCartContext)
}


export function ShoppingCartProvider({children}:shoppingCartProviderProps)
{
    const [cartItems, setcartItems] = useLocalStorage<cartItem[]>('shopping-cart',[])
    const [isOpen, setisOpen] = useState(false)

    const cartQuantity=cartItems.reduce((quantity,item)=>item.quantity+quantity,0)

    function getItemQuantity(id:number){
        return cartItems.find(item=>item.id === id)?.quantity||0;
    }

    function increaseCartQuantity(id:number){
        setcartItems(curritems=>{
           if(curritems.find(item=>item.id===id)==null){
            return [...curritems,{id,quantity:1}]
           }
           else{
            return curritems.map(item=>{
                if(item.id==id){
                    return {...item,quantity:item.quantity+1}
                }else{
                    return item;
                }
            })
           } 
        })        
    }

    function decreaseCartQuantity(id:number){
        setcartItems(curritems=>{
            if(curritems.find(item=>item.id===id)?.quantity===1){
                return curritems.filter(item=>item.id!==id)
               }
            else{
             return curritems.map(item=>{
                 if(item.id==id){
                     return {...item,quantity:item.quantity-1}
                 }else{
                     return item;
                 }
            })
        }})        
    }

    function removeFromCart(id:number){
        setcartItems(curritems=>{
            return curritems.filter(item=>item.id!==id);
        })
    }

    const openCart=()=>{
        setisOpen(true)
    }
    const closeCart=()=>{
        setisOpen(false)
    }

    return <shoppingCartContext.Provider value={{openCart,closeCart,getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart,cartItems,cartQuantity}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </shoppingCartContext.Provider>
}