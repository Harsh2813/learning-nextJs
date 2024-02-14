import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';

function MeetupItem(props) {

  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/new-meetup/${props.id}`);//hmne new-meetup folder banaya h page ke andar isiliye new-meetup route ke baad id ayegi agar forlder ko hi [new-meetup] bnate aur usme index.js bnate to hmara route dynamic hota na ki new-meetup ke andar becauase folder name hi dynamic liye mtlb /id aisa aata kuchh
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
