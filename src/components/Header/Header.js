import "./Header.css"
import tv from "../../util/images/tv.png";

const Header = () => {
	return (	
		<span 
			onClick={() => window.scroll(0, 0)}
			className='header'
		>
			StreamSift
			<img src={tv} alt="tv" className="tv" />
		</span>
	)
};

export default Header;