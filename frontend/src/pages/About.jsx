
const About = () => {
    return (
        <div className='container'>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
            <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
                <a className="navbar-brand" href="/">Navbar</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link" href="#scrollspyHeading1">First</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#scrollspyHeading2">Second</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false">Dropdown</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#scrollspyHeading3">Third</a></li>
                            <li><a className="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
                <h4 id="scrollspyHeading1">First heading</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <h4 id="scrollspyHeading2">Second heading</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <p>...</p>
                <h4 id="scrollspyHeading3">Third heading</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <p>...</p>
                <h4 id="scrollspyHeading4">Fourth heading</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <p>...</p>
                <h4 id="scrollspyHeading5">Fifth heading</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima itaque adipisci veritatis rerum nobis necessitatibus ipsum ut mollitia soluta. Omnis neque voluptate rem soluta exercitationem veritatis ex architecto ratione.</p>
                <p>...</p>
            </div>
        </div>
    )
}

export default About;