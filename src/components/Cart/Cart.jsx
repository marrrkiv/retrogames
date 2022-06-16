import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles'
import CartItem from './Cartitems/Cartitem'
import {Link} from 'react-router-dom'

const Cart = ({ cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart }) => {
    const classes = useStyles(); 

    const isEmpty = !cart.line_items.length;

    const EmptyCart = ()=>(        
        <Typography variant='subtitle1'>У вас ще немає товарів, 
        <Link to='/' className={classes.link}> додайте щось! </Link>
        </Typography>
    );

    const FilledCart = ()=>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div  className={classes.cardDetails} >
                <Typography variant="h4">
                    Сумарно : {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className = { classes.emptyButton} size = " large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Спорожнити
                    </Button>

                    <Button component = { Link} to = '/checkout' className = { classes.checkoutButton} size = " large" type="button" variant="contained" color="primary">
                        Оплатити
                    </Button>

                </div>
            </div>
        </>
    );


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3" gutterBottom>Ваша корзина: </Typography>
        { isEmpty ? <EmptyCart/> : <FilledCart/>}
    
    </Container>

  )
}

export default Cart