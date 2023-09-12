import "./App.css";
import Menu from "./components/menu";
import Formulario from "./components/formulario";
import Menus from "./components/menus";
import Productos from "./components/productos";
import Ventas from "./components/ventas";
import Caja from "./components/caja";
import Recibos from "./components/recibos";
import Control from "./components/control";
import Inicio from "./components/inicio";
import Registros from "./components/registros";

import { useEffect, useState } from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import smartContractRegistro from "./registro.json";

function App() {
  const [Metamask, setMetamask] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accountshow, setAccountshow] = useState(null);
  const [balanceshow, setBalanceshow] = useState(null);
  const [contract, setContract] = useState();
  const [acceso, setAcceso] = useState();
  const [acceder, setAcceder] = useState();
  const [ListarInformacion, setListarInformacion] = useState([]);

  const conectarWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        await window.ethereum.enable();

        const accounts = await web3Instance.eth.getAccounts();
        const account = accounts[0]; //setea
        //console.log(accounts[0]);

        setAccount(accounts[0]);
        setAccountshow(accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4));

        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
        //console.log(balanceEth);

        setBalance(balanceEth);
        setBalanceshow(balanceEth.slice(0, 5));

        const contractInstance = new web3Instance.eth.Contract(
          smartContractRegistro,
          smartContractRegistro && "0xa067b8b63e809eCdDdD51a99d255100551e28F42"
        );
        setContract(contractInstance);
        //console.log("contractInstance ==>", contractInstance);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  const ListarRegistros = async () => {

    if (contract) {
      try {
        const taskCounter = await contract.methods.taskCounter().call();

        let arrayTarea = [];

        for (let i = 0; i <= taskCounter; i++) {
          const infotarea = await contract.methods.tasks(i).call();

          if (infotarea.title != "") {
            const tarea = {
              title: infotarea.title,
              creatAtl: infotarea.creatAtl,
              id: infotarea.id,
              description: infotarea.description,
              done: infotarea.done,
            };
            //console.log(tarea);
            arrayTarea.push(tarea);
          }
        };
        //console.log(arrayTarea);
        setListarInformacion(arrayTarea);

      } catch (error) {
        console.error('Error al actualizar valor:', error);
      }
    }
  };

  const Acceso = async () => {
    if(contract){
      const taskCounter = await contract.methods.taskCounter().call();
    for (let i = 0; i <= taskCounter; i++){
      const temp = await contract.methods.tasks(i).call();
      console.log(temp.done)
      if(temp.description == account){
        setAcceder(true)
      }

      if (temp.description == account && temp.done == true){
        setAcceso(true)
      }else{
        //setAcceso(false)
      }
    }
    }
  };

  useEffect(() => { ListarRegistros(); }, [contract]);
  useEffect(() => { Acceso(); }, [contract]);

  const estadoInicialFormulario = {
    title: "",
    description: "",
  };

  const registrarInformacion = async (e) => {
    e.preventDefault();
    //console.log(formulario);

    try {
      const result = await contract.methods.createTask(formulario.title, formulario.description,).send({ from: account });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const ManejarFormulario = ({ target: { name, value } }) => {

    setFormulario({ ...formulario, [name]: value });

  };

  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const cambioEstadoTarea = async (taskId) => {
    if (contract && account) {
      try {
        await contract.methods.cambioEstado(taskId).send({ from: account });
        ListarRegistros(); // Refresco
      } catch (error) {
        console.error('Error al cambiar estado:', error);
      }
    }
  };


  useEffect(() => {
    conectarWallet();
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        console.log("Wallet: SI.");
        setMetamask(true);
      } else {
        console.log("Wallet: NO");
      }
    }
    Wallet();
  }, []);

  //console.log(acceso)
  return (
    <Router>
      <div>
          <>
            <Menu
              conectarWallet={conectarWallet}
              direccion={accountshow}
              saldo={balanceshow}
              Metamask={Metamask}
              acceso={acceso} acceder={acceder}
            ></Menu>

            <div className="centro">
            {Metamask ? (
              <Routes>
                <Route path="/form" element={
                  <> <Formulario
                    registrarInformacion={registrarInformacion}
                    ManejarFormulario={ManejarFormulario}
                    formulario = {formulario} 
                    ListarInformacion = {ListarInformacion}
                    cambioEstadoTarea = {cambioEstadoTarea}/><Registros />
                  </>} />
                <Route path="/menu" element={<Menus acceso={acceso} acceder={acceder} />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/caja" element={<Caja />} />
                <Route path="/recibos" element={<Recibos />} />
                <Route path="/control" element={<Control />} />
                <Route path="/control" element={<Control />} />
                <Route path="/inicio" element={<Inicio />} />
              </Routes>
              ) : (<><Caja /></>)}
            </div>
          </>
      </div>
    </Router>
  );
}

export default App;
