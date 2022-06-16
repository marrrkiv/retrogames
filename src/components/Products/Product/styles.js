import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
     maxWidth:'100%',
     backgroundColor : "#808080",
     color:"white"
    },

  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
