import "./ProjectionPhoto.scss";

const gallery = [
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/01-large.jpg",
        smallImage: "/portfolio/01-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/02-large.jpg",
        smallImage: "/portfolio/02-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/03-large.jpg",
        smallImage: "/portfolio/03-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang chân",
        largeImage: "/portfolio/04-large.jpg",
        smallImage: "/portfolio/04-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/05-large.jpg",
        smallImage: "/portfolio/05-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/06-large.jpg",
        smallImage: "/portfolio/06-small.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/07-large.jpg",
        smallImage: "/portfolio/07-small.jpg"
    },
    {
        title: "Ảnh chụp cắt lớp phổi",
        largeImage: "/portfolio/08-large.jpg",
        smallImage: "/portfolio/08-small.jpg"
    },
    {
        title: "Nội soi",
        largeImage: "/portfolio/09-large.jpg",
        smallImage: "/portfolio/09-small.jpg"
    },
];

export const Image = ({ title, largeImage, smallImage }: any) => {
    return (
        <div className="portfolio-item">
            <div className="hover-bg">
                <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
                    <div className="hover-text">
                        <h4>{title}</h4>
                    </div>
                    <img src={smallImage} className="image" alt={title} />{" "}
                </a>
            </div>
        </div>
    );
};

const ProjectionPhoto = () => {
    return (
        <div style={{ maxWidth: "1200px", margin: 'auto'}}>
            <div id="portfolio" className="text-center">
                <div className="wrapper">
                    {gallery
                        ? gallery.map((d, i) => (
                              <div key={`${d.title}-${i}`} className="grid-item">
                                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                              </div>
                          ))
                        : "Loading..."}
                </div>
            </div>
        </div>
    );
};

export default ProjectionPhoto;
