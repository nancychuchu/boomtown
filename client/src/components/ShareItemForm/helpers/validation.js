export default function validate(values, checkedTags) {
  const errors = {};

  /**
   * @TODO: Write the validation rules for the share form.
   *
   * An item title, description, and at least one tag is required for all items.
   */
  if (!values.title || values.title === '') {
    errors.title = 'Please name your item';
  }

  if (!values.description || values.description === '') {
    errors.description = 'Please describe your item.';
  }

  if (!checkedTags || checkedTags.length === 0) {
    errors.tags = 'Please add at least one tag';
  }
  return errors;
}
