import { useMetadata } from 'vike-metadata-react';
import './Page.css'
import MenuButtons from './components/MenuButtons';

export default function Page() {
  useMetadata({
    title: "Home | Jaxsenville",
  })
  return (
    <>
    <MenuButtons />
    </>
  );
}
