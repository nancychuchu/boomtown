export default function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please name your item';
  }

  if (!values.description || values.description === '') {
    errors.description = 'Please describe your item.';
  }

  if (!values.tags || values.tags.length < 1) {
    errors.tags = 'Please add at least one tag';
  }
  return errors;
}
