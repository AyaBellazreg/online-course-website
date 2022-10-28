import React from 'react'

function AboutPartRemoved() {
    return (
        <div>
        <section id="about">
               <Container>
                    <div className="boxes">
                        <div className="box">
                            <img src={aboutImg} alt="achievements"/>
                        </div>
                        <div className="box box-details">
                            <h3>Our School is Lorem ipsum dolor sit amet consectetur</h3>
                            <p>Lorem ipsum <span class="highlighted-text">Highlited text</span> sit amet consectetur, adipisicing elit. Autem odit iusto libero quas ut. Maxime ut optio eligendi totam iure neque praesentium, corporis, distinctio illum officiis, similique sequi amet rem!</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quisquam harum nulla vitae ad voluptatem facere enim delectus consequuntur exercitationem!</p>
                            <Link to="/" className="btn btn-more">Discover More</Link>
                        </div>
                    </div>
               </Container>
           </section>
        </div>
    )
}

export default AboutPartRemoved;
