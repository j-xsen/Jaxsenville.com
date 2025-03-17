import './Page.css'
import MenuButtons from './components/MenuButtons';
import { useMetadata } from 'vike-metadata-react';

export default function Page() {
  useMetadata({title: "Home | Jaxsenville"})
  return (
    <>
    <MenuButtons />
    </>
  );
}
