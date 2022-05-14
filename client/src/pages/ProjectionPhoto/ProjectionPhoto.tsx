import "./ProjectionPhoto.scss";

const gallery = [
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/01.jpg",
        smallImage: "/portfolio/01.jpg"
    },
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/02.jpg",
        smallImage: "/portfolio/02.jpg"
    },
    {
        title: "Ảnh chụp X Quang ngực",
        largeImage: "/portfolio/03.jpg",
        smallImage: "/portfolio/03.jpg"
    },
    {
        title: "Ảnh chụp X Quang chân",
        largeImage: "/portfolio/04.jpg",
        smallImage: "/portfolio/04.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/05.jpg",
        smallImage: "/portfolio/05.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/06.jpg",
        smallImage: "/portfolio/06.jpg"
    },
    {
        title: "Ảnh chụp X Quang thận",
        largeImage: "/portfolio/07.jpg",
        smallImage: "/portfolio/07.jpg"
    },
    {
        title: "Ảnh chụp cắt lớp phổi",
        largeImage: "/portfolio/08.jpg",
        smallImage: "/portfolio/08.jpg"
    },
    {
        title: "Nội soi",
        largeImage: "/portfolio/09.jpg",
        smallImage: "/portfolio/09.jpg"
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
