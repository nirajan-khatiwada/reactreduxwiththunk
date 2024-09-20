import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchDatas=()=>{
    return async (dispatch)=>{

        const fetchData=async ()=>{
            const resp=await fetch('https://otp-verification-45094-default-rtdb.firebaseio.com/cart.json')
            const data=await resp.json()
            return data

        }

        try{
            const data=await fetchData()
            console.log(data)
            dispatch(cartActions.replaceCart(data))



        }catch{ 
            dispatch(cartActions.replaceCart({totalQuantity:0,items:[],changes:true}))

        }

    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
          })
        );
  
        const sendRequest = async () => {
          const response = await fetch(
            "https://otp-verification-45094-default-rtdb.firebaseio.com/cart.json",
            {
              method: "PUT",
              body: JSON.stringify(cart),
            }
          );
  
          if (!response.ok) {
            throw new Error("Sending cart data failed.");
          }
        };
  
        try {
          await sendRequest();
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "Sent cart data successfully!",
            })
          );
        } catch (err) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Sending cart data failed!",
            })
          );
        }
      };
  };