import icoeth from './img/etereo.png';
import icomm from './img/metamask.png';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

const Menu = (props) => {
    return (
        <div>
            <div className="navbar">

                <div className='contenedor'>

                    <div className="logo">SivarP0$</div>

                    <ul className="menu">
                    {props.Metamask ? (<>
                    
                        {props.direccion ? (<></>) : (
                            <>
                                <button onClick={props.conectarWallet} className="boton" value={props.account}>Conectar wallet</button>
                            </>)}

                        {props.direccion ? (
                            <>
                                <table>
                                    <tbody onClick={props.conectarWallet} className='saldoydireccion'>
                                        <tr>
                                            <td className='flex-row'><img className='icon' src={icomm}></img> {props.direccion}</td>
                                        </tr>
                                        <tr>
                                            <td className='flex-row'><img src={icoeth}></img> {props.saldo} ETH</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>) : (<></>)
                        }

                    </>):(<><button className='boton'>Instala metamask</button></>)}
                        
                    </ul>

                </div>

            </div>

            <div className="navbarr">

                <div className='contenedor'>

                    <ul className="menu">

                    {props.acceso ? (<><li><Link to="/menu">Dashboard</Link></li></>):(<><li><Link to="/caja">Caja</Link></li></>)}
                        <li><Link to="/form">Usuarios</Link></li>
                    </ul>



                </div>
            </div>

        </div>
    )
};
export default Menu;
