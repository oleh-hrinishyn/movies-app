import { useEffect, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

export default function Redirect(props: { to: string; params?: string }) {
  const navigate = useNavigate();
  const path = useMemo(() => generatePath(props.to, props.params ?? {}), [props]);

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return null;
}
