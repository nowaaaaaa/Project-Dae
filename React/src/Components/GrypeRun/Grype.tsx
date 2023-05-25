import React, { useState } from 'react';
import { exec } from 'child_process';

const GrypeButton: React.FC = () => {
  const [grypeOutput, setGrypeOutput] = useState<string | null>(null);

  const handleRunGrype = async () => {
    const directory = '/path/to/target/directory';
    const command = `grype ${directory}`;

    try {
      const { stdout, stderr } = await executeCommand(command);

      if (stderr) {
        console.error('Grype error:', stderr);
        return;
      }

      setGrypeOutput(stdout);
    } catch (error) {
      console.error('Error running Grype:', error);
    }
  };

  const executeCommand = (command: string): Promise<{ stdout: string, stderr: string }> => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }

        resolve({ stdout, stderr });
      });
    });
  };

  return (
    <div>
      <button onClick={handleRunGrype}>Run Grype</button>
      {grypeOutput && <pre>{grypeOutput}</pre>}
    </div>
  );
};

export default GrypeButton;
