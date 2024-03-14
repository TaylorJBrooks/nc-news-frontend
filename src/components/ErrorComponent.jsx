export default function ErrorComponent({isError}) {
  return isError ? <p>Oops that didnt work! Please try again!</p> : null;
}
