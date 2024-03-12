import React from 'react'

export default function VoteError({isError}) {
  return isError ? <p>Oops that didnt work! Please try again!</p> : null;
}
