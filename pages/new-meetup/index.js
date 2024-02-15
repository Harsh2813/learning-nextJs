// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {//just getting input data from newMeetUpFrom and posting to db
    const response = await fetch('/api/newMeetup', {//in api folder there is newMeetup so for this url there fn run
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {'Content-Type' : 'application/json'}
    });
    const data = await response.json();
    console.log(data);
    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;