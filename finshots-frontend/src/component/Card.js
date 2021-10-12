
import logo from '../assets/images/website13.jpg';

const HomeCard= ({
    img_logo = logo,
    link = "",
    title = "",
    issue = ""
}) => {
    return (
        <div className="tile">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img className="certificate-img" src={img_logo} alt=""/>
                <header className="certificate-title">{title}</header>
                <footer className="certificate-issue">Issued on {issue}</footer>
            </a>
        </div>
    );
}

export {DailyCard, HomeCard};
