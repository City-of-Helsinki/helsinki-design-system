import React from 'react';
/*
  Simple hook that will let us know if a
  component has mounted yet.
  Doesn't track unmounts.
*/
function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
export default useHasMounted;
