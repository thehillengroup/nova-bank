import { LinearGradient } from 'expo-linear-gradient';

type GradientCardProps = {
  children?: any;
};

export function GradientCard({ children }: GradientCardProps) {
  return (
    <LinearGradient
      colors={["rgba(99,102,241,0.25)", "rgba(15,23,42,0.85)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl border border-white/5 p-6"
    >
      {children}
    </LinearGradient>
  );
}
