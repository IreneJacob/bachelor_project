clear all;
clc;

% LINE NUMBER TABLE 

% LOAD NECESSARY .DAT FILES
A = load(fullfile('.','LineNumberTable','computeLineStartOffsets.dat'));
B = load(fullfile('.','LineNumberTable','getLine.dat'));
C = load(fullfile('.','LineNumberTable','getSourcePosition.dat'));


% Correlations
corr(A(:,1),A(:,2)); % shows a decent correlation (barely) but method is simple
corr(B(:,1),B(:,2)); % does not seem to correlate well
corr(C(:,1),C(:,2)); % does not seem to correlate well

figure
scatter(A(:,1),A(:,2))