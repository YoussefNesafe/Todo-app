import { FiEdit } from "react-icons/fi";
import './itemlist.css'
import { MdOutlineDelete } from "react-icons/md";

export const Itemlist = (props) => {
	let { item, editItem, deleteItem } = props;
	return(<div className="itemList">
		<h3>{item.name}</h3>
		<div>
			<FiEdit size={'20px'} cursor={'pointer'} color={'green'}   className="editIcon" onClick={() => editItem(item.id)} />
			<MdOutlineDelete size={'20px'} cursor={'pointer'} color={'red'}   className="deleteIcon" onClick={() => deleteItem(item.id)} />
		</div>
	</div>);
};
