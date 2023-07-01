import { useStateContext } from "@/context/StateContext"
export default function Card(product:any){
//Destructure the product object
const {url,name,description,price} = product.product
//Grabbing the addToCart function from the context
const {onAdd} = useStateContext()

    return(
        <div className="card w-[120em] bg-base-100 shadow-xl m-5">
{ /* eslint-disable-next-line @next/next/no-img-element */}
  <figure><img src={url} alt="trees" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{description}</p>
    
    <div className="card-actions justify-end m-2">
      <button className="btn btn-primary" onClick={()=>onAdd(product.product,1)}>Buy</button>
    </div>
  </div>
</div>
    )
    
}