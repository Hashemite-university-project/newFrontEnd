import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

function CodeEditor() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const languages = [
    { name: 'JavaScript', value: 'javascript', apiLang: '63' },
    { name: 'Python', value: 'python', apiLang: '71' },
    { name: 'C++', value: 'cpp', apiLang: '76' },
    { name: 'Java', value: 'java', apiLang: '62' },
  ];


  const codeTemplates = {
    javascript: `
class Example {
  constructor() {
    this.message = "Hello, JavaScript!";
  }
  greet() {
    return this.message;
  }
}

const example = new Example();
console.log(example.greet());
`,
    python: `
class Example:
    def __init__(self):
        self.message = "Hello, Python!"
    
    def greet(self):
        return self.message

example = Example()
print(example.greet())
`,
    cpp: `
#include <iostream>
#include <string>

class Example {
public:
    Example() : message("Hello, C++!") {}
    
    std::string greet() const {
        return message;
    }

private:
    std::string message;
};

int main() {
    Example example;
    std::cout << example.greet() << std::endl;
    return 0;
}
`,
    java: `
public class Example {
    private String message = "Hello, Java!";
    
    public String greet() {
        return message;
    }

    public static void main(String[] args) {
        Example example = new Example();
        System.out.println(example.greet());
    }
}
`,
  };

  const getLanguageId = () => languages.find((lang) => lang.value === language)?.apiLang;

  useEffect(() => {
    // Set the code template based on the selected language
    setCode(codeTemplates[language]);
  }, [language]);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('');
    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?fields=*',
        {
          source_code: code,
          language_id: getLanguageId(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': '11671a06f3msh629f9fa5104a64bp1ad307jsnffa2d70c18db',
          },
        }
      );

      const { token } = response.data;
      let result = null;
      while (!result) {
        const resultResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?fields=*`,
          {
            headers: {
              'x-rapidapi-key': '11671a06f3msh629f9fa5104a64bp1ad307jsnffa2d70c18db',
            },
          }
        );

        if (resultResponse.data.status.id > 2) {
          result = resultResponse.data;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      setOutput(result.stdout || result.stderr || 'No output');
    } catch (error) {
      setOutput('Error executing code.');
      console.error('Execution error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-editor-container h-screen p-6 bg-gray-900 dark:bg-gray-900 flex flex-col space-y-6">
      {/* /* Top Controls */ }
      <div className="flex flex-col md:flex-row items-start mb-2 md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full">
          <label htmlFor="language" className="block text-gray-200 mb-1">
            Select Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-300 px-3 py-2"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunCode}
          className="bg-blue-600 m-2 hover:bg-blue-700 text-white px-4 py-2 rounded-md md:w-auto w-full"
          style={{ marginTop: '28px' }}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* /* Editor and Output Panels */} 
      <div className="flex-1 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Code Editor */}
        <div className="flex-1 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">Code Editor</h2>
          <Editor
            height="650px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="flex-1 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">Output</h2>
          <div className="output-content h-48 bg-gray-800 p-4 rounded-lg overflow-y-auto">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;