import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Caja from "./caja.jsx";

const Menus = (props) => {
    console.log(props.acceso)
    return (
    <div>

        <div id="wrapper">
            <div id="content">
                <div className="container">
                    {props.acceder ? (
                    <>
                    {props.acceso ? (<><Link to="/productos"><div className="box P texto centro">PRODUCTOS</div></Link></>):(<></>)}
                        <Link to="/ventas"><div className="box P texto centro">VENTAS</div></Link>
                        <Link to="/caja"><div className="box P texto centro">CAJA</div></Link>
                        <Link to="/recibos"><div className="box P texto centro">RECIBOS</div></Link>
                        {props.acceso ? (<><Link to="/control"><div className="box P texto centro">PANEL DE CONTROL</div></Link></>):(<></>)}
                    </>):(<><Caja/></>)}
                        

                </div>
            </div>
        </div>

    </div>
    )
};
export default Menus; 