import React from 'react'
import { Typography, Button, Card, CardContent, CardMedia, CardActions} from "@material-ui/core";
import useStyles from './styles';


const Cartitem = ({item,handleUpdateCartQty,handleRemoveFromCart}) => {
    const classes = useStyles();
  return (
    <Card>
        <CardMedia image = {item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h5'>{item.price.formatted_with_symbol}</Typography>

        </CardContent>

        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type='button' size='small'  onClick={()=> handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography>{item.quantity}</Typography>
            <Button type='button' size='small' onClick={()=> handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
            </div>
            <Button variant='containt' type='button' color='secondary' onClick={()=> handleRemoveFromCart(item.id)}>Видалити</Button>
        </CardActions>

    </Card>
  )
}

export default Cartitem