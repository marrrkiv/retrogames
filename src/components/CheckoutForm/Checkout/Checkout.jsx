import React,{useEffect, useState} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom';
const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart,handleCaptureCheckout,order,error}) => {
    const classes = useStyles();
    const history = useHistory();
    const [shippingData, setShippingData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [isFinished, setIsFinished] = useState(false);

    const nextStep = () => setActiveStep((prevActiveStep)=>prevActiveStep+1)
    const backStep = () => setActiveStep((prevActiveStep)=>prevActiveStep-1)
    

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch {
              if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);
    

    const next = (data)=>{
        setShippingData(data)
        nextStep()
    }
    const timeout = ()=>{
        setTimeout(()=>{
            setIsFinished(true)
        },3000)
    }
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>
    ): isFinished ? (
        <>
        <div>
          <Typography variant="h5">Thank you for your purchase! You can contact with us : +3809360277700</Typography>
          <Divider className={classes.divider}/>
          
          </div>
          <br/>
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    ));

    if(error){
        <>
            <Typography variant='h5'>Error:{error}</Typography>
            <br/>
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>

        </>
    }

    const Form = ()=> activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} timeout={timeout}/>

    

  return (
      <>
    <CssBaseline/>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center' >Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                            </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : checkoutToken&&<Form/>}
            </Paper>

        </main>
    </>
  )
}

export default Checkout