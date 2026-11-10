import { BADGE_NAME } from '@/lib/site';

export default function BadgeArt() {
  return (
    <span className="badge-wrap">
      <img className="badge-art" src="/assets/badge-early.svg" alt={BADGE_NAME} width={293} height={290} loading="lazy" decoding="async" />
      <span className="badge-shine" aria-hidden="true" />
    </span>
  );
}
