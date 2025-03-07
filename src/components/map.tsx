

function Map() {

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }
    return (
        <
      >
       
        <div className=" overflow-hidden shadow-lg border border-gray-200">
          <iframe 
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            src="https://maps.google.com/maps?&amp;height=400&amp;hl=en&amp;q=malumichampatti&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </>
    )}

    export default Map;
