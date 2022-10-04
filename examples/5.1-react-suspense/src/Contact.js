export default function Contact({
  name = "Steve Jobs",
  email = "steve@apple.com",
  tagline = "Stay hungry, stay foolish",
}) {
  return (
    <div className="contact">
      <h5 className="contact__name">{name}</h5>
      <h6 className="contact__email">{email}</h6>
      <p className="contact__tagline">{tagline}</p>
    </div>
  );
}
