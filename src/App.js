import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchMerchantToken } from './Redux/MerchantToken/MerchantTokenActions';
import { fetchConfig } from './Redux/Config/ConfigActions';
//import './App.css';
import Header from './components/Header'
import BelowHeader from './components/BelowHeader'
import BannerNew from './components/BannerNew'
import Menu from './components/Menu'
import BookTable from './components/BookTable'
import Footer from './components/Footer'

function App() {
  // store data access start
const merchant_data = useSelector(state =>state.MerchantToken)
const config_data = useSelector(state =>state.Config)

// store data access End
  const dispatch = useDispatch()  // for accessing the redux function

  // component all states define start
  const [merchantInfo,setMerchantInfo] = useState([])
  const [configInfo,setConfigInfo] = useState([])
  const [detailed_cart_item,setDetailed_cart_item] = useState([])
  const [banner_info,setBanner_info] = useState([])
  // component all states define End

   //hooks start
   // useEffect(() =>{
   //   dispatch(fetchMerchantToken())
   // },[dispatch])

   useMemo(()=>{
      setMerchantInfo(merchant_data.merchant_token.object)
  },[merchant_data && merchant_data.merchant_token && merchant_data.merchant_token.object])

  // useEffect(() =>{
  //   if(merchantInfo && merchantInfo.access_token){
  //     const user_token = merchantInfo.access_token
  //     dispatch(fetchConfig(user_token))
  //   }
  //
  // },[merchantInfo && dispatch])

  useMemo(()=>{
   if(config_data && config_data.config && config_data.config.object){
     setConfigInfo(config_data.config.object)
   }
 },[config_data])
   //hooks end

const detailed_cart_item_callbackFunction = (childdata) =>{
  setDetailed_cart_item(childdata)
}
const banner_info_callbackFunction = (childdata) =>{
  setBanner_info(childdata)
}
  return (
    <div className="App">
      <Header configInfo={configInfo} Detailed_cart_item={detailed_cart_item}/>
      {
      //  <BelowHeader />
      }
      <BannerNew />
      <Menu configInfo={configInfo}
      merchantInfo={merchantInfo}
      detailed_cart_item_parentcallbackfunction = {detailed_cart_item_callbackFunction}
      banner_info_parentcallbackfunction = {banner_info_callbackFunction}
      />
      {
        // <BookTable />
      }

      <Footer configInfo={configInfo} merchantInfo={merchantInfo} banner_info={banner_info}/>
    </div>
  );
}

export default App;
