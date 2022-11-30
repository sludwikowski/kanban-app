export const validateData = ({ name, user, idColumn, deadline }) => {
  const errors = []
  if (name.length === 0) errors.push('Enter task name!')
  if (user.length === 0) errors.push('Add user!')
  if (idColumn === 0) errors.push('Select implementation phase!')
  const regDate = /(20[0-9]{2})-(0[1-9]|1[0-2])-(0[0-9]|[12][0-9]|3[01])/
  if (!regDate.test(deadline) && deadline !== '') { errors.push('Wrong date!') }
  return errors
}
