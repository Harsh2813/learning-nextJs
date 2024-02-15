import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  //accepting props from getStaticProps below as meetupData
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
//getStaticPaths hm dynamic page me mtlb [] array me jo h aur jb getStaticProps ye use kre to hi getStaticPaths use krna padta h hme sare paths jo bhi hme lg rha imp possible path ho saktah user ka use predefine kr dete h isme id ke sath taki us path ko hm access krke data show kr sake context.params. se jaise niche kiye getStaticProps me
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/meetups?retryWrites=true&w=majority"
  ); //connect kiye mongo se
  const db = client.db(); //data base access kiye
  const meetupCollection = db.collection("meetups"); //data base se collection liye meetups ka
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); //find me first object filter krne ke liye h ki kuchh filter krke chahiye pr hme sb chahiye aur usme id bs chahiye to dusra object fir array of object kiye
  client.close();

  return {
    fallback: false, //ye false mtlb hm ye bta rhe ki hmne sari id ya path define kr diye yha to 404 error milega, aur true mtlb abhi kcuhh aur paths ho sakte h jise dynamacily next js bna dega according to data and path
    paths: meetups.map((meetup) => ({
      //sare path jitni bhi id thi dynamic de diye params me as meetupId
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

//here we will use useStaticProps because we want to set data first to MeetupDetails for pre render
export async function getStaticProps(context) {
  //in getStaticProps context don't handle res or req

  const meetupId = context.params.meetupId; //this params.meetupId is not pre rendered id it is something which users having in url after clicking to that product so we won't get the meetupId becuase getStaticProps is pre rendered at build time so for getting paths which user can visit we used above

  const client = await MongoClient.connect(
    "mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/meetups?retryWrites=true&w=majority"
  ); //connect kiye mongo se
  const db = client.db(); //data base access kiye
  const meetupCollection = db.collection("meetups");

  //NOTE- id in mongodb is object type key and our meetupId is like string so for matching it from id we need to convert meetupId to object type Id and for that we imported ObjectId from mongodb
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  }); //hmne uper params me sari id leke path define kr diye ab yha meetupId me wo selected url path liye jo perticular id ke liye h to ab hmen findOne me sirf ek id ke liye find kiye filter lga diye ki id chahiye jiski id meetupId se same ho
  client.close();

  return {
    props: {//ab ye meetupData props pass karenge uper meetupDetails compo me
      meetupData:{//for matching id we changed meetupId to object but for passing props our id should also string in object because we passing object and data will be array of object so we are converting like below
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
    },
  };
}
export default MeetupDetails;
