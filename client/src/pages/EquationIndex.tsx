import { useState } from "react";
import { useEquations } from "@/hooks/use-equations";
import { CyberCard } from "@/components/CyberCard";
import { LatexDisplay } from "@/components/LatexDisplay";
import { CyberButton } from "@/components/CyberButton";
import { Link } from "wouter";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EquationIndex() {
  const [search, setSearch] = useState("");
  const { data: equations, isLoading, error } = useEquations(search);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            HYPER<span className="text-secondary">-AXIOMATIC</span> INDEX
          </h1>
          <p className="font-mono text-primary/60 text-sm">
            // ACCESSING ARCHIVES... // FOUND {equations?.length || 0} ENTRIES
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary/50 group-focus-within:text-primary">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="SEARCH_BY_CODE_OR_TITLE"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-primary/30 text-primary px-10 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all placeholder:text-primary/20"
          />
          <div className="absolute inset-0 border border-transparent group-focus-within:border-primary/50 pointer-events-none animate-pulse" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="p-8 border border-destructive/50 bg-destructive/10 text-center text-destructive">
          <h3 className="font-bold text-lg mb-2">ERROR FETCHING DATA</h3>
          <p className="font-mono text-sm">{error.message}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {equations?.map((eq, i) => (
            <Link key={eq.id} href={`/equations/${eq.id}`} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="h-full"
              >
                <CyberCard 
                  className="h-full hover:bg-white/5 cursor-pointer group"
                  title={eq.title}
                  code={eq.code}
                >
                  <div className="py-8 flex items-center justify-center min-h-[120px]">
                    <div className="text-lg text-white/90 group-hover:text-primary transition-colors duration-300">
                      <LatexDisplay expression={eq.latex} />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-muted-foreground">
                    <span>{eq.category}</span>
                    <span className="text-primary/0 group-hover:text-primary transition-colors duration-300">
                      ACCESS_DATA &gt;&gt;
                    </span>
                  </div>
                </CyberCard>
              </motion.div>
            </Link>
          ))}
          
          {equations?.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-lg">
              <p className="text-muted-foreground font-mono">NO DATA FOUND FOR QUERY</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
