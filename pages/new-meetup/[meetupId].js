import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
}
//getStaticPaths hm dynamic page me mtlb [] array me jo h aur jb getStaticProps ye use kre to hi getStaticPaths use krna padta h hme sare paths jo bhi hme lg rha imp possible path ho saktah user ka use predefine kr dete h isme id ke sath taki us path ko hm access krke data show kr sake context.params. se jaise niche kiye getStaticProps me
export async function getStaticPaths(){
  return{
    fallback: false,//ye false mtlb hm ye bta rhe ki hmne sari id ya path define kr diye yha to 404 error milega, aur true mtlb abhi kcuhh aur paths ho sakte h jise dynamacily next js bna dega according to data and path
    paths: [
      {
        params:{
          meetupId: 'm1',
        },
      },
      {
        params:{
          meetupId: 'm2',
        },
      },
    ]
  }
}
//here we will use useStaticProps because we want to set data first to MeetupDetails for pre render
export async function getStaticProps(context) {
  //in getStaticProps context don't handle res or req

  const meetupId = context.params.meetupId;//this params.meetupId is not pre rendered id it is something which users having in url after clicking to that product so we won't get the meetupId becuase getStaticProps is pre rendered at build time so for getting paths which user can visit we used above 

  return {
    props: {
      meetupDdata: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        meetupId: meetupId,
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "This is a first meetup",
      },
    },
  };
}

export default MeetupDetails;
