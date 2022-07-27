import { toast, Zoom} from 'react-toastify';

export function Notify(type, text) {
    if (type === 'success') {
      toast.success(text, {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error(text, {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }