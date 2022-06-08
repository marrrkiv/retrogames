import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles'
import CartItem from './Cartitems/Cartitem'
import {Link} from 'react-router-dom'

const Cart = ({ cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart }) => {
    const classes = useStyles(); 

    const isEmpty = !cart.line_items.length;

    const EmptyCart = ()=>(        
        <Typography variant='subtitle1'>You don`t have any item yet, 
        <Link to='/' className={classes.link}> add something! </Link>
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
                    Total : {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className = { classes.emptyButton} size = " large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Empty the cart
                    </Button>

                    <Button component = { Link} to = '/checkout' className = { classes.checkoutButton} size = " large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>

                </div>
            </div>
        </>
    );


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3" gutterBottom>Your cart: </Typography>
        { isEmpty ? <EmptyCart/> : <FilledCart/>}
    
    </Container>

  )
}

export default Cart